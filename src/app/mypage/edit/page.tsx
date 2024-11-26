'use client';

import Account from '../_components/edit/ACCOUNT';
import Profile from '../_components/edit/PROFILE';

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import { usePatchMemberImage } from '@/services/member/hooks/usePatchMemberImage';
import { Loader2, PencilLine } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const editMenus = [
  { label: '프로필', value: 'PROFILE' },
  { label: '출금계좌', value: 'ACCOUNT' },
];
export default function MyPageEdit() {
  const [selectTab, setSelectTab] = useState(editMenus[0].value);
  const [memberProfileImagePath, setMemberProfileImagePath] = useState<string | undefined>(
    undefined,
  );
  const [memberNickname, setMemberNickname] = useState<string | null>(null);
  const {
    mutate: patchMemberImage,
    isSuccess: isImageSuccess,
    data: responseImage,
    isPending: isImageLoading,
  } = usePatchMemberImage();

  const imageRef = useRef<HTMLInputElement>(null);
  const getFileData = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const fileType = file.type;
      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        alert('파일 형식이 맞지 않습니다. JPG, PNG 파일을 업로드해주세요.');
        reject('Invalid file type');
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (!reader.result) {
            reject('Failed to read file');
            return;
          }

          const base64Raw = (reader.result as string).split(',')[1]; // Base64 데이터 추출
          const extension = file.name.split('.').pop(); // 파일 확장자 추출
          const byteSize = file.size; // 파일 크기 (바이트 단위)

          const imageData = {
            base64Raw,
            extension: extension?.toUpperCase(),
            byteSize,
          };
          resolve(imageData);
        };
        reader.onerror = () => {
          reject('Error reading file');
        };
      }
    });
  };

  const onHandleMainImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    imageRef?.current?.click();
  };
  const saveImgFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files?.length <= 0) return;
    const mainImageFile = files?.[0];
    if (!mainImageFile) return;
    const imageData = await getFileData(mainImageFile);

    patchMemberImage({ image: imageData });
  };

  useEffect(() => {
    if (!isImageSuccess) return;
    setMemberNickname(responseImage?.member.nickname);
    setMemberProfileImagePath(responseImage?.member.profileImagePath);
  }, [isImageSuccess]);

  // TODO: image /static prefix는 어떻게 처리할지 고민해보기
  // TODO: get profile 어디서 관리해야되지? profileImagePath를 가져와야 함
  // 이미지 보일 때 안늘어나게 처리하기
  return (
    <section className="mx-[100px] my-10">
      <div className="flex gap-16">
        <div>
          <div className="relative">
            <Avatar className="h-[180px] w-[180px] shadow-xl">
              <AvatarImage src={memberProfileImagePath} />
              <AvatarFallback>{memberNickname}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-1 right-2 rounded-full"
              onClick={onHandleMainImage}
              disabled={isImageLoading}
            >
              {isImageLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <PencilLine className="h-4 w-4" />
              )}
            </Button>
            <Input
              type="file"
              className="hidden"
              ref={imageRef}
              accept="image/*"
              onChange={saveImgFile}
            />
          </div>
        </div>
        <div className="w-full">
          <Tabs defaultValue={editMenus[0].value} value={selectTab || editMenus[0].value}>
            <TabsList>
              {editMenus.map((menu) => {
                return (
                  <TabsTrigger
                    value={menu.value}
                    key={menu.value}
                    onClick={() => setSelectTab(menu.value)}
                  >
                    {menu.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value={'PROFILE'}>
              <Profile />
            </TabsContent>
            <TabsContent value={'ACCOUNT'}>
              <Account />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
