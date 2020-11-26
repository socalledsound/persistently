// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcvquhO2CGo8zyIH9hGx54NN1ADeA65vg",
    authDomain: "persistently-4625f.firebaseapp.com",
    databaseURL: "https://persistently-4625f.firebaseio.com",
    projectId: "persistently-4625f",
    storageBucket: "persistently-4625f.appspot.com",
    messagingSenderId: "526323833103",
    appId: "1:526323833103:web:93182b3faf5f09c571867a"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//set up refs to firestore
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true});
const imagesRef =  db.collection('images');

//ref to storage
const storage = firebase.storage();


// get divs from the dom
const drop = document.querySelector('#drop');
const gallery = document.querySelector('#gallery');

// an array to store image paths for p5 sketch;
const imgPathsFromFirestore = [];

// snapshot listener for images collection on firestore
// will get called any time 'images' on firestore is updated
db.collection('images').onSnapshot( snapshot => {
    let update = snapshot.docChanges();
    update.forEach(image => {
        console.log(image.doc.data())
        imgPathsFromFirestore.push(image.doc.data());
        
        //use this if we want to add them into the flex div
        addToGallery(image.doc.data().imageURL);
    })
})

// prevent window from default behavior
window.addEventListener("dragover",function(e){
    e = e || event;
    e.preventDefault();
    },false);

// handle image drop onto drop zone 
drop.addEventListener('drop',function(e){
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log(file);
    const fileSize = file.size / 1024 / 1024;
    const reader = new FileReader();

    if (file) {           
        if(fileSize > 1) {
            alert('file cannot be bigger than 1MB')
            }
        else {
            reader.readAsDataURL(file);
            }
        }


    reader.addEventListener('load', (e)=>{
        let fileToUpload = reader.result;
        const metadata = { contentType: file.type};
        const upload = uploadFile(file, metadata);
    },function(){
        console.log('loading failed');
        alert('loading failed');
    })

})


// add an image item to the DOM
function addToGallery(img){
    const imgElement = document.createElement('img');
    console.log(img);
    imgElement.src = img;
    const div = document.createElement('div');
    div.className = 'img-item';
    div.appendChild(imgElement);
    gallery.appendChild(div);
}

// generate an id, decided it wasn't necessary but it might be a good idea to add later
function generateRandomId(){
    const uint32  = window.crypto.getRandomValues(new Uint32Array(1))[0];
    console.log(uint32);
    return uint32.tostring(16);
}

// handle image upload to firestore
function uploadFile(fileToUpload, metadata){
    const uniqueId = window.crypto.getRandomValues(new Uint32Array(1))[0]; 
    const filePath = `images/${uniqueId}.jpg`;
    const upload = storage.ref().child(filePath).put(fileToUpload, metadata).then((snapshot)=>{
        snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log(downloadURL);
            // addToGallery(downloadURL);
            imagesRef.add({imageURL: downloadURL});
        });  
    });
                    
}

