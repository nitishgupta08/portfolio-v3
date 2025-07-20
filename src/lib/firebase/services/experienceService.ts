import { collection, getDocs, orderBy, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import type { Experience } from '@/types/Experience';

const COLLECTION_NAME = 'experiences';

export class ExperienceService {
  static async getAllExperiences(): Promise<Experience[]> {
    
    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true') {
      throw new Error('Using fallback data for testing');
    }
    
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('isVisible', '==', true),
      );
      const querySnapshot = await getDocs(q);
      
      const experiences: Experience[] = [];
      querySnapshot.forEach((doc) => {
        experiences.push({
          id: doc.id,
          ...doc.data()
        } as Experience);
      });
      
      return experiences;
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw new Error('Failed to fetch experiences');
    }
  }

  static setupRealTimeListener(onDataChange: () => void) {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isVisible', '==', true)
    );
    
    return onSnapshot(q, (snapshot) => {
      if (!snapshot.empty && !snapshot.metadata.fromCache) {
        console.log('Experience data changed, invalidating cache');
        onDataChange();
      }
    }, (error) => {
      console.error('Real-time listener error:', error);
    });
  }
}
