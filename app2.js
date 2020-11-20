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

    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true});

    const storage = firebase.storage();
    const imagesRef =  db.collection('images');


    const drop = document.querySelector('#drop');
    const gallery = document.querySelector('#gallery');

    db.collection('images').onSnapshot( snapshot => {
        let update = snapshot.docChanges();
        update.forEach(image => {
            console.log(image.doc.data())
            addToGallery(image.doc.data().imageURL);
        })
    })

    window.addEventListener("dragover",function(e){
        e = e || event;
        e.preventDefault();
      },false);

    drop.addEventListener('drop',function(e){
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        console.log(file)
        const fileSize = file.size / 1024 /1024;
        const reader = new FileReader();
        reader.addEventListener('load', (e)=>{
            let fileToUpload = reader.result;
            console.log(file)
            const metadata = { contentType: file.type}
            // console.log(uploadFile);
            //addToGallery(fileToUpload);
            console.log(fileToUpload, metadata);
            const upload = uploadFile(file, metadata);
            // console.log(upload);
            // imagesRef.add(upload, metadata);
            
        },function(){
            console.log('loading failed');
            alert('loading failed');
        })
        if (file) {           
            if(fileSize > 1) {
                alert('file cannot be bigger than 1MB')
             }
            else {
                reader.readAsDataURL(file);
             }
            }
    })


    function addToGallery(img){
        const imgElement = document.createElement('img');
        console.log(img);
        imgElement.src = img;
        const div = document.createElement('div');
        div.className = 'img-item';
        div.appendChild(imgElement);
        gallery.appendChild(div);
    }

    function generateRandomId(){
        const uint32  = window.crypto.getRandomValues(new Uint32Array(1))[0];
        console.log(uint32);
        return uint32.tostring(16);
    }

    // console.log(generateRandomId());
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

