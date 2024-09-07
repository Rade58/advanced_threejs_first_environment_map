# Generating environment map by using AI tools

## Nvidia Canvas

I can't use nvidia canvas since I don't use Windows, and this software is only available in windows

Also this software was in beta during this workshop:  sep 4 2024

Software is cool, but lacks many things, you can generate nice panoramic images

In this case, you would get .exr file and you would use EXRLoader to load file in threejs 

## BlockadeLabs

<https://www.blockadelabs.com/>

Sign up select SkyboxAI and you can write propmpt in there

But downloads are available only with paid subscription

you would aso use something like `environmentMaap.colorSpace = THREE.SRGBColorSpace`

you cn also increase envMapIntensity, it will look better