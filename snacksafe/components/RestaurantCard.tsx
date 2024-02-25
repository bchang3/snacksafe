import Link from 'next/link';
import { FaBowlFood } from "react-icons/fa6";
import { LiaStarSolid } from "react-icons/lia";
import { IoShieldCheckmark } from "react-icons/io5";



type TRestaurantDataPrimary = {
  restaurantName: string;
  restaurantImage: string;
  distance: string;
  safety: number;
  rating: number;

};

type TRestaurantCard = {
    restaurantID: number;
    restaurantData: TRestaurantDataPrimary;
}

export default function RestaurantCard({ restaurantName, restaurantImage, distance, safety, rating }: TRestaurantDataPrimary) {
  const getColorRating = (num: number) => {
    return (num <= rating)
  }
  const getColorSafety = (num: number) => {
    return (num <= safety)
  }
 
  return (
    <div className="">
          <div className="flex bg-beige hover:bg-beige-secondary text-black mb-4 rounded-xl h-24 w-96 mt-4 border-moss_green-secondary overflow-hidden border-2">
            <div className="flex flex-row w-full items-center ">
              {/* <FaBowlFood className="h-24 w-24 ml-4 mr-4"/> */}
              <div className="flex items-center ml-4 rounded-xl h-44 w-44 overflow-hidden">
              <img className="rounded-xl border-black border-1 object-fill h-18 w-18 overflow-hidden" src={restaurantImage}></img>
              </div>
              <div className="flex w-full">
                <div className="ml-2 text-lg w-full font-grotesk-regular object-contain">{restaurantName}</div>
              </div>
              <div className="flex w-full mr-2 justify-end text-sm text-14 font-normal h-full" aria-hidden="true">
                <div className="flex flex-col h-full">
                  <div className="flex font-grotesk-regular mt-1">{distance}</div>
                  <div className="flex flex-row mt-8">
                    <IoShieldCheckmark className={
                      getColorSafety(1) ? 'fill-moss_green-secondary'
                      : 'fill-red'
                } />
                    <IoShieldCheckmark className={
                      getColorSafety(2) ? 'fill-moss_green-secondary'
                      : 'fill-red'
                } />
                    <IoShieldCheckmark className={
                      getColorSafety(3) ? 'fill-moss_green-secondary'
                      : 'fill-red'
                } />

                  </div>
                  <div className="flex flex-row mt-1">
                    <LiaStarSolid className={
                      getColorRating(1) ? 'fill-bronze'
                      : ''
                }></LiaStarSolid>
                    <LiaStarSolid className={
                      getColorRating(2) ? 'fill-bronze'
                      : ''
                }></LiaStarSolid>
                    <LiaStarSolid className={
                      getColorRating(3) ? 'fill-bronze'
                      : ''
                }></LiaStarSolid>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}