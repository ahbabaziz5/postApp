 //Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
 import { getFirestore,collection,updateDoc,getDocs,addDoc,deleteDoc,doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyC2-kWzJvGpn9B7XVMyfx6r-fBCL1uYEp4",
   authDomain: "test-d14aa.firebaseapp.com",
   projectId: "test-d14aa",
   storageBucket: "test-d14aa.appspot.com",
   messagingSenderId: "1022392053565",
   appId: "1:1022392053565:web:51e35dec0dd7cbd1629f54"
 };

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
 const db = getFirestore(app); 


 
 let btn = document.getElementById('btn');


btn.addEventListener('click',async()=>{
let input = document.getElementById('input').value;
let desc = document.getElementById('desc').value;
try {
  const docRef = await addDoc(collection(db, "postApp"), {
   txt:input,
   desc:desc,
  });
  const querySnapshot = await getDocs(collection(db, "postApp"));
querySnapshot.forEach((doc) => {
    let post = document.getElementById('post');
post.innerHTML += `<h1>${(doc.data().txt)}</h1><p>${(doc.data().desc)}</p><button onclick="update('${doc.id}')">update</button><button onclick="del('${doc.id}')">delete</button>`
  console.log(doc.data(),"data");
  console.log(doc.id , "id");
  console.log(doc , "doc");
  
});
  
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}


})

const update = async(id) => {
  console.log(id);
  const updateList = doc(db, "todo", id);
  var updatedTitle = prompt('Enter Your Updated Title');
 var updatedDesc = prompt('Enter Your Updated desc');
 
  // Set the "capital" field of the city 'DC'
  await updateDoc(updateList, {
      txt: updatedTitle,
      desc: updatedDesc,
  }).then(() => {
      window.location.reload();
  });
}

const del = async(id) =>{
     await deleteDoc(doc(db, "postApp", id))
     
     .then(() => {
      window.location.reload();
  });

}
window.del=del;
window.update=update;