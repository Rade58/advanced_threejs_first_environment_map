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

You will get jpeg file and you can load it with TextureLoader

you would aso use something like `environmentMaap.colorSpace = THREE.SRGBColorSpace`and you would use equirectangular maping we already show