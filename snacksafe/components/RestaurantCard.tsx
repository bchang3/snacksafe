import Link from 'next/link';

type TRestaurantDataPrimary = {
  restaurantName: string;
  restaurantImage: {
      src: string;
      alt: string;
  };
  distance: string;
  deliveryTime: string;
  pickupTime: string;
  isDashPass: boolean;
};

type TRestaurantCard = {
    restaurantID: number;
    restaurantData: TRestaurantDataPrimary;
}

export default function RestaurantCard({ restaurantID, restaurantData }: TRestaurantCard) {

  return (
    <article className="min-w-374 h-245 scroll-snap-align-start sm:flex-1 sm:min-w-[calc((100%-32px)/3)] md:flex-1 md:min-w-unset md:flex-0 md:calc((100%-16px)/2) lg:flex-0 lg:w-346 xl:flex-0 xl:w-293">
      <Link href={`/store/${restaurantID}`} passHref legacyBehavior>
        <a className="flex flex-col gap-14 text-decoration-none">
          <div className="flex">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-6 m-2">
                <span className="text-16 font-semibold">{restaurantData.restaurantName}</span>
              </div>
              <span className="text-14 font-normal text-quinary-gray" aria-hidden="true">
                {restaurantData.distance} • {restaurantData.deliveryTime} • $0 delivery fee over $12
              </span>
            </div>
          </div>
        </a>
      </Link>
    </article>
  );
}