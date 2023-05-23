import React from "react";
import { RGBELoader } from "three-stdlib";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Center,
  Text3D,
} from "@react-three/drei";
import { DOMENNAME } from "../../middlewares/initialState";
import Roboto from "./Roboto_Regular.json";

export const Text3DComponent = () => {
  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
  );
  return (
    <Center>
      <Text3D font={Roboto}>{"children"}
      <meshBasicMaterial color={0xff0000}/>
      </Text3D>
    </Center>
  );
};
