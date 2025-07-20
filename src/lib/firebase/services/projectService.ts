import { collection, getDocs, orderBy, query, where, onSnapshot } from 'firebase/firestore';
import { db } from "@/lib/firebase/firebase";
import type { Project } from "@/types/Project";

const COLLECTION_NAME = "projects";

export class ProjectService {
  static async getAllProjects(): Promise<Project[]> {

    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true') {
      throw new Error('Using fallback data for testing');
    }

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("isVisible", "==", true),
        orderBy("order", "asc")
      );
      const querySnapshot = await getDocs(q);

      const projects: Project[] = [];
      querySnapshot.forEach((doc) => {
        projects.push({
          id: doc.id,
          ...doc.data(),
        } as Project);
      });

      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error("Failed to fetch projects");
    }
  }

  static async getFeaturedProjects(): Promise<Project[]> {

    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true') {
      throw new Error('Using fallback data for testing');
    }

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("isVisible", "==", true),
        where("isFeatured", "==", true)
      );
      const querySnapshot = await getDocs(q);

      const projects: Project[] = [];
      querySnapshot.forEach((doc) => {
        projects.push({
          id: doc.id,
          ...doc.data(),
        } as Project);
      });

      return projects;
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      throw new Error("Failed to fetch featured projects");
    }
  }

  static async getProjectBySlug(slug: string): Promise<Project | null> {

    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true') {
      throw new Error('Using fallback data for testing');
    }

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("slug", "==", slug),
        where("isVisible", "==", true)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data(),
        } as Project;
      }

      return null;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw new Error("Failed to fetch project");
    }
  }

  static setupRealTimeListener(onDataChange: () => void) {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isVisible', '==', true)
    );
    
    return onSnapshot(q, (snapshot) => {
      if (!snapshot.empty && !snapshot.metadata.fromCache) {
        console.log('Projects data changed, invalidating cache');
        onDataChange();
      }
    }, (error) => {
      console.error('Projects real-time listener error:', error);
    });
  }

}
