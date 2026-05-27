import React, {

memo

} from "react";


function RecommendationCard({

vendor

}) {

const name =

vendor?.name

||

"Unknown Vendor";


const city =

vendor?.city

||

"Location unavailable";


const rating =

typeof vendor?.rating

=== "number"

?

vendor.rating.toFixed(1)

:

"N/A";


const description =

vendor?.description?.trim()

||

"No description available";


const hasPricing =

vendor?.price_min

!= null

&&

vendor?.price_max

!= null;


const pricing =

hasPricing

?

`₹${vendor.price_min.toLocaleString()} - ₹${vendor.price_max.toLocaleString()}`

:

"Pricing unavailable";


return (

<div

className="

border

rounded-xl

p-4

shadow-sm

bg-white

mb-3

hover:shadow-md

transition-shadow

duration-200

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

"

title={name}

>

{name}

</h3>

<p

className="

text-gray-500

text-sm

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

whitespace-nowrap

"

>

⭐ {rating}

</div>

</div>

<div

className="

mt-3

text-sm

text-gray-700

break-words

"

>

{description}

</div>

<div

className="

mt-3

font-medium

text-blue-700

"

>

{pricing}

</div>

</div>

);

}


export default memo(

RecommendationCard

);