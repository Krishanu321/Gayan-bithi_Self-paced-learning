
import React from 'react';
import { format } from 'date-fns';

interface LastUpdatedProps {
  updatedAt: Date;
}

const LastUpdated = ({ updatedAt }: LastUpdatedProps) => {
  const formattedDate = updatedAt instanceof Date 
    ? format(updatedAt, 'MMMM d, yyyy')
    : 'Unknown date';

  return (
    <div className="text-sm text-muted-foreground">
      Last updated: {formattedDate}
    </div>
  );
};

export default LastUpdated;
