import { GeneratedContent } from './aiService';

// Keys for local storage
const COURSES_KEY = 'easystudy-courses';
const MATERIALS_KEY = 'easystudy-materials';

// Course type
export interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  materials: string[]; // IDs of related materials
  createdAt: Date;
  updatedAt: Date;
}

// Get all courses
export const getCourses = (): Course[] => {
  const coursesJson = localStorage.getItem(COURSES_KEY);
  if (!coursesJson) return [];
  
  try {
    const parsed = JSON.parse(coursesJson);
    return parsed.map((course: any) => ({
      ...course,
      createdAt: new Date(course.createdAt),
      updatedAt: new Date(course.updatedAt)
    }));
  } catch (error) {
    console.error('Failed to parse courses from storage:', error);
    return [];
  }
};

// Save a course
export const saveCourse = (course: Course): void => {
  const courses = getCourses();
  const existingIndex = courses.findIndex(c => c.id === course.id);
  
  if (existingIndex >= 0) {
    courses[existingIndex] = {
      ...course,
      updatedAt: new Date()
    };
  } else {
    courses.push({
      ...course,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
};

// Delete a course
export const deleteCourse = (id: string): void => {
  const courses = getCourses();
  const filteredCourses = courses.filter(course => course.id !== id);
  localStorage.setItem(COURSES_KEY, JSON.stringify(filteredCourses));
};

// Get all materials
export const getMaterials = (): GeneratedContent[] => {
  const materialsJson = localStorage.getItem(MATERIALS_KEY);
  if (!materialsJson) return [];
  
  try {
    const parsed = JSON.parse(materialsJson);
    return parsed.map((material: any) => ({
      ...material,
      createdAt: new Date(material.createdAt)
    }));
  } catch (error) {
    console.error('Failed to parse materials from storage:', error);
    return [];
  }
};

// Save material
export const saveMaterial = (material: GeneratedContent): void => {
  const materials = getMaterials();
  const existingIndex = materials.findIndex(m => m.id === material.id);
  
  if (existingIndex >= 0) {
    materials[existingIndex] = material;
  } else {
    materials.push(material);
  }
  
  localStorage.setItem(MATERIALS_KEY, JSON.stringify(materials));
};

// Delete material
export const deleteMaterial = (id: string): void => {
  const materials = getMaterials();
  const filteredMaterials = materials.filter(material => material.id !== id);
  localStorage.setItem(MATERIALS_KEY, JSON.stringify(filteredMaterials));
  
  // Also remove material references from courses
  const courses = getCourses();
  const updatedCourses = courses.map(course => ({
    ...course,
    materials: course.materials.filter(materialId => materialId !== id)
  }));
  
  localStorage.setItem(COURSES_KEY, JSON.stringify(updatedCourses));
};

// Get course by ID
export const getCourseById = (courseId: string) => {
  const courses = JSON.parse(localStorage.getItem('easystudy-courses') || '[]');
  return courses.find((course: any) => course.id === courseId) || null;
};

// Get material by ID
export const getMaterialById = (id: string): GeneratedContent | null => {
  const materials = getMaterials();
  const material = materials.find(m => m.id === id);
  return material || null;
};

// Get materials for a specific course
export const getMaterialsByCourse = (courseId: string): GeneratedContent[] => {
  const course = getCourseById(courseId);
  if (!course) return [];
  
  const allMaterials = getMaterials();
  return allMaterials.filter(material => course.materials.includes(material.id));
};

// Update course progress
export const updateCourseProgress = (courseId: string, progress: number) => {
  const courses = JSON.parse(localStorage.getItem('easystudy-courses') || '[]');
  const updatedCourses = courses.map((course: any) => {
    if (course.id === courseId) {
      return { ...course, progress, updatedAt: new Date() };
    }
    return course;
  });
  localStorage.setItem('easystudy-courses', JSON.stringify(updatedCourses));
};

// Add generated material to course
export const addMaterialToCourse = (courseId: string, materialId: string): void => {
  const course = getCourseById(courseId);
  if (!course) return;
  
  if (!course.materials.includes(materialId)) {
    saveCourse({
      ...course,
      materials: [...course.materials, materialId],
    });
  }
};

// Update chapter completion
export const updateChapterCompletion = (courseId: string, chapterId: string, completed: boolean) => {
  const courses = JSON.parse(localStorage.getItem('easystudy-courses') || '[]');
  const updatedCourses = courses.map((course: any) => {
    if (course.id === courseId) {
      const updatedChapters = (course.chapters || []).map((chapter: any) => {
        if (chapter.id === chapterId) {
          return { ...chapter, completed };
        }
        return chapter;
      });
      
      // Calculate course progress
      const completedChapters = updatedChapters.filter((chapter: any) => chapter.completed).length;
      const progress = Math.round((completedChapters / updatedChapters.length) * 100);
      
      return { 
        ...course, 
        chapters: updatedChapters,
        progress,
        updatedAt: new Date() 
      };
    }
    return course;
  });
  
  localStorage.setItem('easystudy-courses', JSON.stringify(updatedCourses));
};
