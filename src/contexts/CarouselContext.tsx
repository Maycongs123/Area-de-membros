import React, { ReactNode, createContext, useContext, useState } from "react";
import { Course } from "../types";

interface CourseContextType {
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  courses: Course[];
  handleUpdatedCourses: (newCarousels: Course[] | []) => void;
}

export const CourseContext = createContext({} as CourseContextType);

interface CarouselContextProviderProps {
  children: ReactNode;
}

export const CarouselContextProvider: React.FC<
  CarouselContextProviderProps
> = ({ children }) => {
  const [courses, setCourses] = useState<Course[] | []>([]);

  const handleUpdatedCourses = (newCourseList: Course[] | []) => {
    setCourses(newCourseList);
  };

  return (
    <CourseContext.Provider
      value={{
        setCourses,
        courses,
        handleUpdatedCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = (): CourseContextType => {
  const context = useContext(CourseContext);

  return context;
};
