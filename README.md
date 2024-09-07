# ThreeJS advanced techniques - Environment Map (Workshop)

can be used as

- background
- reflection
- lighting


## After dealing with environment map inside threejs we also learned of `HOW TO GENERATE ENVIRONMENT MAP BY USING BLENDER`

## Delete every object we had in blender

I removed the cube and the point light I always have when I open blender

## Changing some properties

### In rendering properties 

Change the rendering engine from `EEVEE` to `Cycles`

Open `Reder` 
Ma Samples
    - Lower it from 4024 to 256

### In World properties
  
set surface `color` to color that is all black
just move vertical slider to bootom which is zero value

### In output property

Change resolution to 2048 x 1024

This is so environment map can be used on other softwers, outside of webgl 2.0

### Create bunch of objects

move them in any direction even bellow

Do this to see if our environment map is working

### Camera

Shift + A and find camera and add it, but don't unselect it before you change the values for it

If you unselect it just select it back again and press `N` and menu will show at the right

x y z set on 0 all

for rotation set x to be 90deg, and y z to be 0deg

## Change properties for the camera

select camera, select camera properties to the right

instead of `perspective` select `panoramic`

and for the type select `equirectangular`

**Don't expect to see preview of the panoramic view in the viewport**

Press `0` on numpad and you 

You can see projection only when rendering

## Add Area light

put it somwhere in the corner, not that far from all of our objects, make it so that it points to the middle of the scene

and scale it to be bigger

change intensity of the light to much more than 10W, for example to 1000 W

See a preview by rendered, 

unselect camera press `z` on keyboard and pick `rendered`

you will see that light isn't visible to the camera

After you see it, go back to `solid`

## Make light visible to the camera

Select light

In properties

`Object properties` -> `visibility` -> `Ray visibility` -> select camera

try now `rendered` and you will see the light

## Do a first render

fn + f12 on keyboard

you will have to wait, don't clse it or try to save it
I gurss it is painting

And then you need to save thi file

**To be honest, this rendering takes too long, and rember when we set sampling for render t o256 earlier, if we left value of around 4000, this would take hours**

After it renders Press `Alt` + `S`

- Name it as `blender-2k.hdr`
- Set file format to be `Radiance HDR`
- Savi it somewhere in our static texture folder in `environment/map` folder for our project
