"use client";

import { Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { visibleLoginState } from "@/states";
import { useRecoilValue } from "recoil";
const dummy = Array(15)
  .fill({})
  .map((_, i) => i);

export default function Home() {
  const visibleLogin = useRecoilValue(visibleLoginState);

  return (
    <Fragment>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="h-[430px] bg-slate-700">box1</div>
          </CarouselItem>
          <CarouselItem>
            <div className="h-[430px] bg-slate-600">box2</div>
          </CarouselItem>
          <CarouselItem>
            <div className="h-[430px] bg-slate-500">box3</div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-[32px]" />
        <CarouselNext className="right-[32px]" />
      </Carousel>

      <Card>
        <CardHeader>
          <CardTitle>책을 추천해요!</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel>
            <CarouselContent>
              {dummy.map((d) => {
                return (
                  <CarouselItem key={d} className="basis-1/3">
                    <div className="h-[250px] bg-slate-700">box {d}</div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-[32px]" />
            <CarouselNext className="right-[32px]" />
          </Carousel>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>새로 나왔어요!</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel>
            <CarouselContent>
              {dummy.map((d) => {
                return (
                  <CarouselItem key={d} className="basis-1/3">
                    <div className="h-[250px] bg-slate-700">box {d}</div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-[32px]" />
            <CarouselNext className="right-[32px]" />
          </Carousel>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>월간 TOP 100</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel>
            <CarouselContent>
              {dummy.map((d) => {
                return (
                  <CarouselItem key={d} className="basis-1/3">
                    <div className="h-[250px] bg-slate-700">box {d}</div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-[32px]" />
            <CarouselNext className="right-[32px]" />
          </Carousel>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>주간 TOP 100</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel>
            <CarouselContent>
              {dummy.map((d) => {
                return (
                  <CarouselItem key={d} className="basis-1/3">
                    <div className="h-[250px] bg-slate-700">box {d}</div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-[32px]" />
            <CarouselNext className="right-[32px]" />
          </Carousel>
        </CardContent>
      </Card>
      <Dialog open={visibleLogin}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
