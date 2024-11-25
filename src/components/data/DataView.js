import React from 'react';
import { useData } from '../hooks/useData';

function DataView() {
  const data = useData();

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}

export default DataView;
