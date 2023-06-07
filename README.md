# Keikkavahti / GigWatch

## What is it?

Keikkavahti is a fullstack application I made as a learning experience for myself. The app also properly conveys my current skill level to potential recruiters.

## What does it do?

I did not want to make an app just for the sake of making one. I wanted to make something me and my friends could maybe use.
The app lists metal gigs in Finland (mainly Helsinki). You can "tag" these gigs if you are interested in them or you already know you are attending.
You can add your friends through the app and they will see what gigs you have tagged and vice versa.

## Is it deployed somewhere?

https://keikkavahti.henkirikos.com/

Deployed using AWS Amplify for the front.

## How did I come up with this idea?

More than a couple of times when talking with my friends a conversation went something along these lines

    Me: "I wanted to go see band X last week, but I didn't want to go alone so I skipped it."
    My friend: "What? I love that band! I didn't know you love it too. I also didn't go because I didn't want to go alone!"

So I thought maybe this app might help with that not happening in the future.

## What technologies did I use?

React, TypeScript, Vite, Chakra-UI, Formik, React-Router, Zod, AWS, JsonWebToken

## What were my design principles?

1. Minimal amount of requests send to the backend. Rather "mimic" the database changes as state than request an update when something changes.

2. Lazyload some of the heavier parts that might not get used. Currently used only for the cards that hold the gigs.

3. Make an easy to use UI that makes sense and is responsive despite my inexperience with creating ... well any UI's at all.

4. Responsive at all screen sizes. Chakra-UI made this very easy.

5. Comment any part of the code that might make someone else think to themselves "Why is this step necessary?"

## Did you make the backend aswell?

Sure did. It can be found here.

https://github.com/Galacca/Keikkavahti-Backend

## Is it done?

Yes...ish? Functionally the app wont change from here. There are no bugs that I know of.
There are however a few backend responses that I really should type properly. A few cases of inproper camelcasing. Maybe lazyloading the "add friend" modal.

I also thought about an idea of having the colors of the gigs in the card change depending on the status of the gig. At least to have 'sold out' gigs to appear
grayed out.
