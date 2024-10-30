import Head from "next/head";
import PrintPage from "../components/printPage";
import styled from "styled-components";
import { useEffect, useState } from "react";

const PageHeader = styled.div`
  width: 600px;
  margin: auto;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 42px;
  padding-bottom: 24px;

  h1 {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.36px;
    color: #585858;
    margin-bottom: 8px;
  }

  p {
    color: #797979;
    margin: 0;
  }
  @media screen and (max-width: 414px) {
    width: 100%;
    padding: 32px 16px 0;
  }
`;

const imagesData = [
  {
    url: "https://videodelivery.net/775b1b7196b2c126b8dc343416211fdb/thumbnails/thumbnail.jpg?height=1080",
    page: "Front Print",
    id: 1,
    pos: 'x'
  },
  {
    url: "https://videodelivery.net/9ad2bb839e4e3cc1074e5d73b0a0379b/thumbnails/thumbnail.jpg?height=1080",
    page: "Page 2",
    id: 2,
    pos: 'x'
  },
  {
    url: "https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/bde5b129-52ba-4f43-b3f4-97591952ea00/large",
    page: "Page 2",
    id: 3,
    pos: 'y'
  },
  {
    url: "https://videodelivery.net/91097538e177847ebeb934a492e146e9/thumbnails/thumbnail.jpg?height=1080",
    page: "Page 3",
    id: 4,
    pos: 'x'
  },
  {
    url: "https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/b73c2865-7a02-408b-654d-89ce2512ae00/large",
    page: "Page 3",
    id: 5,
    pos: 'y'
  },
];

const pages = ["Front Print", "Page 2", "Page 3"];

export default function Testpage() {
  const [images, setImages] = useState(imagesData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <Head>
        <title>Test Page | Popsa.com</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader>
        <h1>Trip to the Beach</h1>
        <p>Hardback Photobook last edited on Thursday 13 April 2022 at 16:28</p>
      </PageHeader>
      <PrintPage
        data={images}
        pages={pages}
        setImages={setImages}
      />
    </div>
  );
}
