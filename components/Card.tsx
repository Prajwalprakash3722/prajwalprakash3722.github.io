/* eslint-disable @next/next/no-img-element */

export interface Props {
  title: string;
  description: string;
  link?: string;
  image?: string;
}

interface IProps {
  data: Props;
}

const Card = ({ data }: IProps) => {
  return (
    <div className="max-w-2xl mx-auto overflow-hidden rounded-lg shadow-md bg-gray-800">
      <img
        className="object-cover w-full h-64"
        src={data.image}
        alt={data.title}
      />

      <div className="p-6">
        <div>
          <a
            href={data.link}
            className="block mt-2 text-2xl font-display  transition-colors duration-200 transform text-white hover:text-gray-300 hover:underline"
            target="blank"
          >
            {data.title}
          </a>
          <p className="mt-2 text-sm text-gray-400 font-medium">
            {data.description.substring(0, 200) + "..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
