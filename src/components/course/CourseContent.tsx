
import React from 'react';

interface CourseContentProps {
  course: any;
  activeChapter: number;
}

const CourseContent = ({ course, activeChapter }: CourseContentProps) => {
  const getPlaceholderContent = (chapterIndex: number) => {
    const placeholderContents = [
      {
        title: "What is SQL and Relational Databases?",
        content: "This chapter introduces SQL as a language for interacting with databases and explains the concept of relational databases, focusing on their structure and key components."
      },
      {
        title: "Basic SQL Commands: SELECT, WHERE, ORDER BY",
        content: "This chapter covers essential SQL commands for searching data, filtering results with WHERE clauses, and sorting data using ORDER BY."
      },
      {
        title: "Data Manipulation: INSERT, UPDATE, DELETE",
        content: "You'll learn how to add new data using INSERT, modify existing data with UPDATE, and remove data with DELETE commands."
      },
      {
        title: "Joins and Aggregations",
        content: "This chapter covers important SQL concepts like joins to combine data from multiple tables and aggregation functions for calculating summaries and statistics."
      },
      {
        title: "Practice Exercises and Project",
        content: "This chapter provides hands-on practice exercises to solidify your understanding of SQL, followed by a simple database project that uses the concepts you've learned."
      }
    ];
    
    return placeholderContents[chapterIndex] || placeholderContents[0];
  };
  
  let content;
  let title;
  
  if (course.chapters && course.chapters[activeChapter]) {
    title = course.chapters[activeChapter].title;
    content = course.chapters[activeChapter].content;
  } else {
    const placeholder = getPlaceholderContent(activeChapter);
    title = placeholder.title;
    content = placeholder.content;
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      
      <div className="prose max-w-none dark:prose-invert">
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <div>
            <p>{getPlaceholderContent(activeChapter).content}</p>
            <h3>Key Points:</h3>
            <ul>
              <li>Understanding the fundamentals of this topic</li>
              <li>Learning practical applications and techniques</li>
              <li>Exploring best practices and common patterns</li>
              <li>Building knowledge through examples and exercises</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContent;
