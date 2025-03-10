import {
  AuthApi,
  CategoryApi,
  Configuration,
  EbookApi,
  EbookImageApi,
  EbookInquiryApi,
  EbookInquiryCommentApi,
  MemberApi,
  NotificationApi,
  PdfApi,
  ReviewApi,
  ReviewCommentApi, //
  //   ServiceInquiryApi,
  //   ServiceInquiryImagesApi,
  //   TransactionControllerApi,
  WishlistApi,
} from '@leesm0518/devooks-api';

import api from '@/lib/api';

export const authAPI = new AuthApi(new Configuration(), process.env.NEXT_PUBLIC_BASE_URL, api);

export const categoryAPI = new CategoryApi(
  new Configuration(),
  process.env.NEXT_PUBLIC_BASE_URL,
  api,
);

export const ebookAPI = new EbookApi(new Configuration(), process.env.NEXT_PUBLIC_BASE_URL, api);

export const ebookImageAPI = new EbookImageApi(
  new Configuration(),
  process.env.NEXT_PUBLIC_BASE_URL,
  api,
);

export const ebookInquiryAPI = new EbookInquiryApi(
  new Configuration(),
  process.env.NEXT_PUBLIC_BASE_URL,
  api,
);

export const ebookInquiryCommentAPI = new EbookInquiryCommentApi(
  new Configuration(),
  process.env.NEXT_PUBLIC_BASE_URL,
  api,
);

export const memberAPI = new MemberApi(new Configuration(), process.env.NEXT_PUBLIC_BASE_URL, api);

export const notificationAPI = new NotificationApi(
  new Configuration(),
  process.env.NEXT_PUBLIC_BASE_URL,
  api,
);

export const pdfAPI = new PdfApi(new Configuration(), process.env.NEXT_PUBLIC_BASE_URL, api);

export const reviewAPI = new ReviewApi(new Configuration(), process.env.NEXT_PUBLIC_BASE_URL, api);

export const reviewCommentAPI = new ReviewCommentApi(
  new Configuration(),
  process.env.NEXT_PUBLIC_BASE_URL,
  api,
);

// export const serviceInquiryAPI = new ServiceInquiryApi(
//   new Configuration(),
//   process.env.NEXT_PUBLIC_BASE_URL,
//   api,
// );

// export const serviceInquiryImagesAPI = new ServiceInquiryImagesApi(
//   new Configuration(),
//   process.env.NEXT_PUBLIC_BASE_URL,
//   api,
// );

// export const transactionControllerAPI = new TransactionControllerApi(
//   new Configuration(),
//   process.env.NEXT_PUBLIC_BASE_URL,
//   api,
// );

export const wishlistAPI = new WishlistApi(
  new Configuration(),
  process.env.NEXT_PUBLIC_BASE_URL,
  api,
);
