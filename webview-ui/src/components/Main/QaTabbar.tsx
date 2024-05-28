import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QaChat from './QaChat';
import QaReview from './QaReview';
import './shadcnCustom.css';

const QaTabbar: FC = () => {
  return (
    <div>
      <Tabs defaultValue="chat" className="">
        <TabsList>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>
        <TabsContent className='TabsContent' value="chat" forceMount>
          <QaChat />
        </TabsContent>
        <TabsContent className='TabsContent' value="review" forceMount>
          <QaReview />
        </TabsContent>
        <TabsContent className='TabsContent' value="coverage" forceMount>Change your Coverage here.</TabsContent>
        <TabsContent className='TabsContent' value="search" forceMount>Change your Search here.</TabsContent>
        <TabsContent className='TabsContent' value="help" forceMount>Change your Help here.</TabsContent>
      </Tabs>
    </div>
  )
}

export default QaTabbar;
