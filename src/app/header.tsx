"use client";

import Image from "next/image";
import Logo from "@/assets/devooks_logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSetRecoilState } from "recoil";
import { visibleLoginState } from "@/states";

export default function Header() {
  const setVisibleLogin = useSetRecoilState(visibleLoginState);
  return (
    <header className="h-[56px] bg-slate-400 flex items-center px-[16px] justify-between gap-6">
      <Image src={Logo} alt="devooks 로고" height={40} />
      <Input />
      <Button onClick={() => setVisibleLogin(true)}>로그인</Button>
    </header>
  );
}
