"use client";

import { useParams } from "next/navigation";
import { Breadcrumb, Button, Rate, Row, Col, Typography } from "antd";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

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

const ProductDetails: FC = () => {
  const { productId } = useParams();

  return (
    <div className="px-4 py-4">
      <Breadcrumb className="text-sm md:text-base" separator=">">
        <Breadcrumb.Item>
          <Link href="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/skincare">Skincare</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/brand">Brand</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Product Name</Breadcrumb.Item>
      </Breadcrumb>

      <div className="mt-8 flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col w-1/12 space-y-2">
          <Image
            src="/path/to/image1.jpg"
            alt="Thumbnail 1"
            width={100}
            height={100}
            layout="responsive"
            className="w-full h-auto"
          />

          <Image
            src="/path/to/image2.jpg"
            alt="Thumbnail 2"
            width={100}
            height={100}
            layout="responsive"
            className="w-full h-auto"
          />

          <Image
            src="/path/to/image3.jpg"
            alt="Thumbnail 3"
            width={100}
            height={100}
            layout="responsive"
            className="w-full h-auto"
          />
          
          <Image
            src="/path/to/image4.jpg"
            alt="Thumbnail 4"
            width={100}
            height={100}
            layout="responsive"
            className="w-full h-auto"
          />
        </div>

        <div className="w-full md:w-5/12">
          <Image
            src="/path/to/product-image.jpg"
            alt="Product Name"
            width={500}
            height={500}
            layout="responsive"
            className="w-full h-auto"
          />
        </div>

        <div className="w-full md:w-5/12 mt-4 md:mt-0 md:ml-8">
          <p className="text-sm uppercase text-gray-500">Brand</p>
          <h1 className="text-2xl md:text-3xl font-bold">
            Product Name Goes Here
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
            Nisl, do fames, consequat adipisicing. Recusandae platea neque, cum,
            accusamus.
            <a href="#" className="text-blue-500 ml-2">
              Read More
            </a>
          </p>
          <div className="mt-4 flex items-center">
            <p className="line-through text-gray-400 mr-4">AED 32.00</p>
            <p className="text-2xl font-semibold text-black">AED 25.60</p>
            <span className="ml-4 py-1 px-3 border border-gray-400 text-gray-700">
              30% Off
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            You can track the price of this product
            <a href="#" className="text-blue-500 ml-2">
              Track Rate
            </a>
          </p>
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
          {/* Additional Links */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#" className="block text-center bg-gray-200 py-2">
              Lorem Ipsem
            </a>
            <a href="#" className="block text-center bg-gray-200 py-2">
              Lorem Ipsem
            </a>
            <a href="#" className="block text-center bg-gray-200 py-2">
              Lorem Ipsem
            </a>
            <a href="#" className="block text-center bg-gray-200 py-2">
              Lorem Ipsem
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          See what Ambassadors say about the product
        </h2>
        <div className="flex flex-col md:flex-row mt-8 space-y-8 md:space-y-0 md:space-x-8">
          {[1, 2].map((review, index) => (
            <div key={index} className="flex-1 p-4 border rounded-lg shadow-md">
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

      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <Title level={2}>Product Details</Title>
        <Paragraph className="text-gray-500">
          Ad illum natoque voluptat leo curabitur est nisi reprehenderit quisque
          illo ullam scelerisque viverra taciti voluptatum adipiscing omnis vel
          augue convallis anim dis quis et molestiae, eos annean corrupti neque?
          Interdum, quisque diam molestie porta iaculis earum?
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
          Water, Brassica Alcohol, Glycerin, Neopentyl Glycol Diethylhexanoate,
          Propanediol, Bis-Stearyl Dimethicone, Trimethylpentanediol/Adipic Acid
          Copolymer, Butyrospermum Parkii (Shea) Butter, Dimethicone, Squalane,
          Potassium Cetyl Phosphate, Retinol, Polysorbate
        </Paragraph>
      </div>

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
                  visi necessitatilius lorem perspiciatis repudiandae ad deciunt
                  delenit facilisi, est orci libero, aspernaturauperiors ornare
                  aliquid vehicula? Prident? Nobis? Deserunt, conubia facilis,
                  amet to.
                </Paragraph>
                <Text className="text-gray-400 text-sm">5 September 2018</Text>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4">
                <Avatar name="Name Surname" rating={3.5} />
              </div>
              <div>
                <Paragraph className="text-gray-500">
                  Porta corporis nibh. Adipisci maiores dui torquent porttitor
                  visi necessitatilius lorem perspiciatis repudiandae ad deciunt
                  delenit facilisi, est orci libero, aspernaturauperiors ornare
                  aliquid vehicula? Prident? Nobis? Deserunt, conubia facilis,
                  amet to.
                </Paragraph>
                <Text className="text-gray-400 text-sm">5 September 2018</Text>
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
                  visi necessitatilius lorem perspiciatis repudiandae ad deciunt
                  delenit facilisi, est orci libero, aspernaturauperiors ornare
                  aliquid vehicula? Prident? Nobis? Deserunt, conubia facilis,
                  amet to.
                </Paragraph>
                <Text className="text-gray-400 text-sm">5 September 2018</Text>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4">
                <Avatar name="Name Surname" rating={3.5} />
              </div>
              <div>
                <Paragraph className="text-gray-500">
                  Porta corporis nibh. Adipisci maiores dui torquent porttitor
                  visi necessitatilius lorem perspiciatis repudiandae ad deciunt
                  delenit facilisi, est orci libero, aspernaturauperiors ornare
                  aliquid vehicula? Prident? Nobis? Deserunt, conubia facilis,
                  amet to.
                </Paragraph>
                <Text className="text-gray-400 text-sm">5 September 2018</Text>
              </div>
            </div>
          </div>
        </div>
        {/* end top reviews */}
      </div>
    </div>
  );
};

export default ProductDetails;
