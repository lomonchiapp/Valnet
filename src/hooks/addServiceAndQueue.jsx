import { addDoc, collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import { database } from '../firebase';

export const addServiceAndQueue = async (service, queue) => {
    try {
        const queueRef = await addDoc(collection(database, 'queues'), queue);
        const serviceRef = await addDoc(collection(database, 'services'), {
            ...service,
            queue: queueRef.id
        });
        const qName = service.name.slice(0,2).toUpperCase()
        await updateDoc(doc(database, 'queues', queueRef.id), {
            ...queue,
            id: queueRef.id,
            service: serviceRef.id,
            name: qName,
            count: 0,
        })
        await updateDoc(doc(database, 'services', serviceRef.id), {
            ...service,
            id: serviceRef.id,
        })
    } catch (error) {
        console.error('Error adding document: ', error);
    }
}