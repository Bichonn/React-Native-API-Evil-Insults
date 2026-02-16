import { initializeApp } from 'firebase/app'
import { getFirestore,collection,addDoc,query,orderBy,onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAN8im4I8qfMvbn4rJJNzasKnyjMcoUVsQ",
  authDomain: "evil-insult-generator-56d22.firebaseapp.com",
  projectId: "evil-insult-generator-56d22",
  storageBucket: "evil-insult-generator-56d22.firebasestorage.app",
  messagingSenderId: "486126187137",
  appId: "1:486126187137:web:8570c34f00493a4d6b1380"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Fonctions CRUD pour la collection d'insultes favoris
export const getInsults = callback => {
  const q = query(collection(db, 'favoris'), orderBy('savedAt', 'desc'))
  onSnapshot(q, snapshot => {
    let insults = []
    snapshot.forEach(doc => {
      insults.push({ id: doc.id, ...doc.data() })
    })
    callback(insults)
  })
}

export const addInsult = async (insult) => {
  try {
    const insultData = {
      ...insult,
      savedAt: new Date().toISOString()
    }
    await addDoc(collection(db, 'favoris'), insultData)
    return { success: true }
  } catch (error) {
    console.error("Erreur lors de l'ajout:", error)
    return { success: false, error }
  }
}

export const deleteInsult = async (insultId) => {
  try {
    await deleteDoc(doc(db, 'favoris', insultId))
    return { success: true }
  } catch (error) {
    console.error("Erreur lors de la suppression:", error)
    return { success: false, error }
  }
}

// Fonctions CRUD pour mes insultes personnelles
export const getMyInsults = callback => {
  const q = query(collection(db, 'myInsults'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, snapshot => {
    let insults = []
    snapshot.forEach(doc => {
      insults.push({ id: doc.id, ...doc.data() })
    })
    callback(insults)
  })
}

export const addMyInsult = async (insultText) => {
  try {
    const insultData = {
      insult: insultText,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    await addDoc(collection(db, 'myInsults'), insultData)
    return { success: true }
  } catch (error) {
    console.error("Erreur lors de l'ajout:", error)
    return { success: false, error }
  }
}

export const updateMyInsult = async (insultId, newText) => {
  try {
    await updateDoc(doc(db, 'myInsults', insultId), {
      insult: newText,
      updatedAt: new Date().toISOString()
    })
    return { success: true }
  } catch (error) {
    console.error("Erreur lors de la modification:", error)
    return { success: false, error }
  }
}

export const deleteMyInsult = async (insultId) => {
  try {
    await deleteDoc(doc(db, 'myInsults', insultId))
    return { success: true }
  } catch (error) {
    console.error("Erreur lors de la suppression:", error)
    return { success: false, error }
  }
}


