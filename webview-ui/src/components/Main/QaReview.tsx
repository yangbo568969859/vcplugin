import { FC, useEffect, useState } from 'react';
// import { getStreamData, getMappers } from '@/api/answer'
import chatTextStream, { getStreamData } from '@/api/eventResource'

const QaReview: FC = () => {
  const [value, setValue] = useState('');
  // useEffect(() => {
  //   async function fetchData() {
  //     const response2 = await getStreamData({
  //       id: 1212,
  //       message: 'yanzhi',
  //     }, (data: any) => {
  //       console.log('getStreamData', data);
  //       setValue((prevValue) => {
  //         return prevValue + data;
  //       })
  //     });
  //     console.log(response2);
  //     // chatTextStream({value: 111});
  //   }
  //   fetchData();
  // }, [])
  return (
    <div>
      QaReview
      <div>
        { value }
      </div>
    </div>
  )
}

export default QaReview;
