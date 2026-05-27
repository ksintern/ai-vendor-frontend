import React,{
memo
} from "react";


function RecommendationCard({

vendor

}){

const name=

vendor?.name

||

"Unknown Vendor";


const city=

vendor?.city

||

"Location unavailable";


const rating=

typeof vendor?.rating

===

"number"

?

vendor.rating.toFixed(

1

)

:

"N/A";


const description=

vendor?.description?.trim()

||

"";


const hasPricing=(

vendor?.price_min

!=

null

&&

vendor?.price_max

!=

null

);


const pricing=

hasPricing

?

`₹${vendor.price_min.toLocaleString()} - ₹${vendor.price_max.toLocaleString()}`

:

"Pricing unavailable";


const rawServices=

Array.isArray(

vendor?.services

)

?

vendor.services

:

[];


const categoryServices=

rawServices.flatMap(

item=>{

if(

typeof item==="string"

){

return[

item

];

}

if(

item?.services

&&

Array.isArray(

item.services

)

){

return item.services;

}

return[];

}

);


const services=[

...new Set(

categoryServices.filter(

Boolean

)

)

];


return(

<div

className="

border

rounded-2xl

p-4

bg-white

shadow-sm

hover:shadow-md

transition-all

duration-200

mb-3

"

>

<div

className="

flex

justify-between

items-start

gap-4

"

>

<div

className="

min-w-0

"

>

<h3

className="

font-semibold

text-lg

truncate

text-gray-900

"

title={name}

>

{name}

</h3>

<p

className="

text-sm

text-gray-500

truncate

"

>

📍 {city}

</p>

</div>

<div

className="

text-yellow-500

font-medium

text-sm

whitespace-nowrap

"

>

⭐ {rating}

</div>

</div>


{

description

&&

(

<p

className="

mt-3

text-sm

text-gray-700

leading-relaxed

"

>

{description}

</p>

)

}


{

services.length>0

&&

(

<div

className="

mt-4

"

>

<p

className="

text-sm

font-medium

text-gray-800

mb-2

"

>

Services

</p>

<div

className="

flex

flex-wrap

gap-2

"

>

{

services.map(

(

service,

index

)=>(

<span

key={`${service}-${index}`}

className="

px-3

py-1

rounded-full

bg-blue-50

text-blue-700

text-xs

font-medium

"

>

{service}

</span>

)

)

}

</div>

</div>

)

}


<div

className="

mt-4

pt-3

border-t

flex

justify-between

items-center

"

>

<p

className="

font-semibold

text-blue-700

"

>

{pricing}

</p>

</div>

</div>

);

}


export default memo(

RecommendationCard

);