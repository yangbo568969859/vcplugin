import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from '@/components/Base/Icons';
import { Button } from '@/components/ui/button';
import QaChat from './QaChat';
import QaReview from './QaReview';
import './shadcnCustom.css';

const QaTabbar: FC = () => {
  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <Tabs defaultValue="chat" className="">
      <div className='w-full flex justify-between rounded-md'>
        <TabsList>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>
        <div className='w-10 h-10 flex items-center justify-center mx-2'>
          <Button
            variant="ghost"
            size="icon"
            onClick={refreshPage}>
            <Icons.refresh size={16} className="rotate-0 scale-100 transition-all" />
          </Button>
        </div>
      </div>
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
  )
}

export default QaTabbar;
