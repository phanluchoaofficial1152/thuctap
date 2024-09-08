"use client";

import { useParams } from "next/navigation";
import {
  Breadcrumb,
  Button,
  Row,
  Col,
  Typography,
  Spin,
  Input,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "./details.css";
import { NextPage } from "next";

const { Title, Paragraph, Text } = Typography;

interface AvatarProps {
  name: string;
  rating: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, rating }) => {
  return (
    <div className="flex items-center">
      <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center text-gray-500 font-bold">
        {name.charAt(0)}
      </div>

      <div className="ml-2">
        <div className="text-gray-400">{name}</div>
        <div className="flex text-yellow-500 text-sm mt-1">
          {[...Array(Math.floor(rating))].map((_, i) => (
            <i key={i} className="fas fa-star mr-1"></i>
          ))}

          {rating % 1 !== 0 && <i className="fas fa-star-half-alt mr-1"></i>}
          {[...Array(5 - Math.ceil(rating))].map((_, i) => (
            <i key={i} className="far fa-star mr-1"></i>
          ))}
        </div>
      </div>
    </div>
  );
};

interface Course {
  id: string;
  course_name: string;
  course_price: number;
  course_discount: number;
  course_description: string;
  course_type: string;
}

interface Campus {
  campus_name: string;
  campus_address: string;
  campus_slug: string;
}

interface ClassDetail {
  id: string;
  class_name: string;
  class_location: string;
  start_date: string;
  end_date: string;
  course: Course;
  campus: Campus;
  course_price: number;
  course_discount: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const ProductDetails: NextPage<{}> = () => {
  const { productId } = useParams();
  const [classDetail, setClassDetail] = useState<ClassDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ClassDetail[]>([]);
  const [loading, setLoading] = useState<any>(true);
  const [activeImage, setActiveImage] = useState<string>(
    "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/84bf1a969195253ffbe1bd34f33ebe65.webp"
  );
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [spaceBetween, setSpaceBetween] = useState(16);
  const [visible, setVisible] = useState(false);
  const [desiredPrice, setDesiredPrice] = useState("");
  const [email, setEmail] = useState("");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setSlidesPerView(2);
        setSpaceBetween(8);
      } else if (window.innerWidth <= 1024) {
        setSlidesPerView(3);
        setSpaceBetween(12);
      } else {
        setSlidesPerView(4);
        setSpaceBetween(16);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://api-pro.teklearner.com/class/v1/class-detail?id=${productId}`
        );

        const relatedResponse = await axios.get(
          `https://api-pro.teklearner.com/class/v1/get-list-class?id=${productId}&skip=0&limit=16`
        );

        const allProducts = relatedResponse.data.data;

        const filteredProducts = allProducts.filter(
          (product: ClassDetail) => product.id !== productId
        );

        setLoading(false);

        setRelatedProducts(filteredProducts);

        setClassDetail(response.data.data);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch class details", error);
      }
    };

    fetchClassDetail();
  }, [productId]);

  if (!classDetail && loading) {
    return (
      <div className="py-5 p-4 flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  const coursePrice = classDetail?.course.course_price;

  const thumbnails = [
    "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/84bf1a969195253ffbe1bd34f33ebe65.webp",
    "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/3bbd35da6cd59d6ad35f79d0cfea8fb7.webp",
    "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/3e52564ad486c238c1277b8d4dc49fea.webp",
    "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/dba04ce4fae3cf8ef5fdba757b60e20d.webp",
  ];

  const breadcrumbItems = [
    {
      title: <Link href="/">Home</Link>,
    },
    {
      title: <Link href="/skincare">Skincare</Link>,
    },
    {
      title: <Link href="/brand">Brand</Link>,
    },
    {
      title: classDetail?.class_name,
    },
  ];

  return (
    <>
      <title>{`${classDetail?.class_name} - IVY moda - Thực tập NextJS`}</title>

      <div className="px-4 md:px-[6rem] py-4">
        {/* điều hướng trang */}
        <Breadcrumb
          className="text-sm md:text-base"
          separator=">"
          items={breadcrumbItems}
        />
        {/* end điều hướng trang */}

        {/* thông tin sản phẩm */}
        <div className="mt-8 flex flex-col md:flex-row bg-white p-3 rounded-lg shadow-lg">
          <div className="w-full md:w-5/12 cursor-pointer">
            <Image
              src={activeImage}
              alt="Product Name"
              width={500}
              height={500}
              layout="responsive"
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-wrap md:flex-col w-full md:w-1/12 mt-4 ml-2 md:mt-0">
            <div className="flex flex-wrap gap-1 justify-center items-center cursor-pointer">
              {thumbnails.map((thumbnail, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-1/3 md:w-full mb-3 md:mb-2"
                  onClick={() => setActiveImage(thumbnail)}
                >
                  <Image
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    layout="responsive"
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-5/12 mt-4 md:mt-0 md:ml-8">
            <p className="text-sm uppercase text-gray-500">
              {classDetail?.course.course_type}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold">
              {classDetail?.class_name}
            </h1>
            <button className="text-gray-500 text-sm mt-2 flex items-center">
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Add to Favourites
            </button>
            <p className="mt-4 text-gray-700 leading-relaxed">
              {classDetail?.course.course_description}
              <a href="#" className="text-blue-500 ml-2">
                Read More
              </a>
            </p>
            <div className="mt-4 flex items-center">
              {(classDetail as ClassDetail)?.course?.course_discount > 0 && (
                <p className="line-through text-gray-400 mr-4">
                  {formatCurrency(Number(classDetail?.course?.course_discount))}
                </p>
              )}
              <p className="text-2xl font-semibold text-black">
                {formatCurrency(Number(coursePrice))}
              </p>
              <span className="ml-4 py-1 px-3 border border-gray-400 text-gray-700">
                30% Off
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              You can track the price of this product
              <a href="#" className="text-blue-500 ml-2" onClick={showModal}>
                Track Rate
              </a>
            </p>
            <Modal
              title="Track Price"
              open={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
              ]}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="w-1/3">
                    <Image
                      src="https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/84bf1a969195253ffbe1bd34f33ebe65.webp"
                      alt="Product Name"
                      width={1000}
                      height={1000}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-2/3 ml-4">
                    <h2 className="text-lg font-bold">
                      {classDetail?.class_name}
                    </h2>
                    <p className="text-gray-500">{`${formatCurrency(
                      Number(coursePrice)
                    )} - 30% Off`}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="desired-price"
                    className="block font-medium text-gray-700"
                  >
                    Desired price
                  </label>
                  <Input
                    id="desired-price"
                    type="number"
                    value={desiredPrice}
                    onChange={(e) => setDesiredPrice(e.target.value)}
                    placeholder="Enter desired price"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="block font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mt-4">
                  <p>
                    When price of this product hits your desired price, we will
                    notify you by sending an email.
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button type="primary" onClick={handleOk}>
                    Track Price
                  </Button>
                </div>
              </div>
            </Modal>
            <div className="mt-6 flex space-x-4">
              <Button type="primary" size="large" className="w-full md:w-auto">
                ADD TO CART
              </Button>
              <Button
                size="large"
                className="w-full md:w-auto bg-black text-white"
              >
                BUY NOW
              </Button>
            </div>
            <button className="text-gray-500 text-sm mt-4 flex items-center">
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              View My Favourite List
            </button>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="#" className="block text-center bg-gray-200 py-2">
                Lorem Ipsem
              </Link>
              <Link href="#" className="block text-center bg-gray-200 py-2">
                Lorem Ipsem
              </Link>
              <Link href="#" className="block text-center bg-gray-200 py-2">
                Lorem Ipsem
              </Link>
              <Link href="#" className="block text-center bg-gray-200 py-2">
                Lorem Ipsem
              </Link>
            </div>
          </div>
        </div>
        {/* end thông tin sản phẩm */}

        {/* khách hàng nói gì về sp này */}
        <div className="mt-6 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-center">
            See what Ambassadors say about the product
          </h2>
          <div className="flex flex-col md:flex-row mt-8 space-y-8 md:space-y-0 md:space-x-8">
            {[1, 2].map((review, index) => (
              <div
                key={index}
                className="flex-1 p-4 border rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l9 5-9 5-9-5 9-5zm0 0V7m0 7v5"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Name Surname</h3>
                    <span className="text-sm text-gray-500">AMBASSADOR</span>
                  </div>
                </div>
                <p className="italic text-gray-600 mb-4">
                  Pede dis ipsum placeat do exercitation laborum nostra non
                  inceptos sociosqu dolorum doloremque...
                </p>
                <Button type="primary" className="w-full">
                  SHOP WITH ME
                </Button>
                <h4 className="mt-6 text-lg font-bold">
                  What I love about this product
                </h4>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="bg-gray-200 p-2 text-center">Lorem Ipsem</div>
                  <div className="bg-gray-200 p-2 text-center">
                    Lorem Ipsem Se
                  </div>
                  <div className="bg-gray-200 p-2 text-center">Lorem Ipsem</div>
                  <div className="bg-gray-200 p-2 text-center">
                    Lorem Ipsem Se
                  </div>
                </div>
                <Button
                  type="default"
                  className="w-full mt-4 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14M12 5l7 7-7 7"
                    ></path>
                  </svg>
                  View More
                </Button>
              </div>
            ))}
          </div>
        </div>
        {/* end khách hàng nói gì về sp này */}

        {/* chi tiết sp */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <Title level={2}>Product Details</Title>
          <Paragraph className="text-gray-500">
            Ad illum natoque voluptat leo curabitur est nisi reprehenderit
            quisque illo ullam scelerisque viverra taciti voluptatum adipiscing
            omnis vel augue convallis anim dis quis et molestiae, eos annean
            corrupti neque? Interdum, quisque diam molestie porta iaculis earum?
          </Paragraph>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={8}>
              <Title level={4}>Key Ingredients</Title>
              <ul className="space-y-2">
                <li>
                  Ingredient - Eger cursus officis, consequuntur adipitin cidunt
                  secinimano
                </li>
                <li>
                  Ingredient - Eger cursus officis, consequuntur adipisci
                  tincidunt, velit nemo dict
                </li>
                <li>
                  Ingredient - Eger cursus officis, consttur adipisci tincidunt,
                  velit
                </li>
                <li>Ingredient - Eger cursus officis, consequntur adipisci</li>
              </ul>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Title level={4}>Key Benefits</Title>
              <ul className="space-y-2">
                <li>
                  Nisl Veneatis, esse conubia nibh ipsum, eiusmod sequi, vitae
                  convallis lectus dignis
                </li>
                <li>
                  Nisl Veneatis, esse conubia nibh ipsum, eiusmod sequi, vitae
                  convallis lectus dignissim integer
                </li>
                <li>
                  Nisl Veneatis, esse conubia nibh ipsum, eiusmod sequi, vitae
                  convallis lect
                </li>
                <li>Nisl Veneatis, esse conubia nibh ipsum, eiusmod sequi</li>
                <li>
                  Nisl Veneatis, esse conubia nibh ipsum, eiusmod sequi, vitae
                  convallis lectus dignissim integer
                </li>
              </ul>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Title level={4}>How to Use?</Title>
              <Paragraph className="text-gray-500">
                Ad illum natoque voluptat leo curabitur est nisi reprehenderit
                quisque illo ullam scelerisque viverra taciti voluptatum
                adipiscing omnis vel augue convallis anim dis quis et molestiae,
                eos annean corrupti neque? Interdum, quisque diam molestie porta
                iaculis earum?
              </Paragraph>
            </Col>
          </Row>

          <Title level={4}>All Ingredients</Title>
          <Paragraph className="text-gray-500">
            Water, Brassica Alcohol, Glycerin, Neopentyl Glycol
            Diethylhexanoate, Propanediol, Bis-Stearyl Dimethicone,
            Trimethylpentanediol/Adipic Acid Copolymer, Butyrospermum Parkii
            (Shea) Butter, Dimethicone, Squalane, Potassium Cetyl Phosphate,
            Retinol, Polysorbate
          </Paragraph>
        </div>
        {/* end chi tiết sp */}

        {/* bình luận */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <Title level={2}>Reviews (1480)</Title>
              <Button type="primary" className="bg-black hover:bg-gray-800">
                WRITE REVIEW
              </Button>
            </div>

            <div className="flex items-center mb-4">
              <Text className="text-yellow-500 mr-2">4 / 5</Text>
              <Text className="text-gray-500">Average Rating</Text>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4">
                  <Avatar name="Name Surname" rating={3.5} />
                </div>

                <div>
                  <Paragraph className="text-gray-500 text-justify">
                    Porta corporis nibh. Adipisci maiores dui torquent porttitor
                    visi necessitatilius lorem perspiciatis repudiandae ad
                    deciunt delenit facilisi, est orci libero,
                    aspernaturauperiors ornare aliquid vehicula? Prident? Nobis?
                    Deserunt, conubia facilis, amet to.
                  </Paragraph>
                  <Text className="text-gray-400 text-sm">
                    5 September 2018
                  </Text>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4">
                  <Avatar name="Name Surname" rating={3.5} />
                </div>
                <div>
                  <Paragraph className="text-gray-500">
                    Porta corporis nibh. Adipisci maiores dui torquent porttitor
                    visi necessitatilius lorem perspiciatis repudiandae ad
                    deciunt delenit facilisi, est orci libero,
                    aspernaturauperiors ornare aliquid vehicula? Prident? Nobis?
                    Deserunt, conubia facilis, amet to.
                  </Paragraph>
                  <Text className="text-gray-400 text-sm">
                    5 September 2018
                  </Text>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <Button type="primary" className="text-white hover:text-gray-700">
                View All
              </Button>
            </div>
          </div>
          {/* end reviews */}

          {/* top reviews */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Title level={2}>Top Reviews</Title>
            <div className="space-y-4 mt-4">
              <div className="flex items-start">
                <div className="mr-4">
                  <Avatar name="Name Surname" rating={3.5} />
                </div>
                <div>
                  <Paragraph className="text-gray-500 text-justify">
                    Porta corporis nibh. Adipisci maiores dui torquent porttitor
                    visi necessitatilius lorem perspiciatis repudiandae ad
                    deciunt delenit facilisi, est orci libero,
                    aspernaturauperiors ornare aliquid vehicula? Prident? Nobis?
                    Deserunt, conubia facilis, amet to.
                  </Paragraph>
                  <Text className="text-gray-400 text-sm">
                    5 September 2018
                  </Text>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4">
                  <Avatar name="Name Surname" rating={3.5} />
                </div>
                <div>
                  <Paragraph className="text-gray-500">
                    Porta corporis nibh. Adipisci maiores dui torquent porttitor
                    visi necessitatilius lorem perspiciatis repudiandae ad
                    deciunt delenit facilisi, est orci libero,
                    aspernaturauperiors ornare aliquid vehicula? Prident? Nobis?
                    Deserunt, conubia facilis, amet to.
                  </Paragraph>
                  <Text className="text-gray-400 text-sm">
                    5 September 2018
                  </Text>
                </div>
              </div>
            </div>
          </div>
          {/* end top reviews */}
        </div>
        {/* end bình luận */}

        {/* sp liên quan */}
        <div className="container mx-auto my-8">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>

          <Swiper
            navigation={true}
            modules={[Navigation]}
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
          >
            {relatedProducts.map((product, index) => (
              <SwiperSlide key={index + 1}>
                <div className="bg-white shadow-md rounded-md overflow-hidden">
                  <div className="relativeee">
                    <Link href={`/sanpham/${product.id}`}>
                      <Image
                        src={
                          "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/84bf1a969195253ffbe1bd34f33ebe65.webp"
                        }
                        alt={product.class_name}
                        width={500}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="absoluteee top-[92%] left-2 bg-black text-white px-2 py-1 rounded-md text-xs">
                      {product.campus.campus_name}
                    </div>
                  </div>
                  <div className="p-4">
                    <Link href={`/sanpham/${product.id}`}>
                      <h3 className="text-lg font-bold mb-2">
                        {product.class_name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 font-bold">
                        {formatCurrency(product.course_price)}
                      </span>
                      {product.course_discount > 0 && (
                        <span className="ml-4 py-1 px-3 border border-gray-400 text-gray-700">
                          {product.course_discount}% Off
                        </span>
                      )}
                    </div>
                    <div className="mt-4">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* end sp liên quan */}
      </div>
    </>
  );
};

export default ProductDetails;
