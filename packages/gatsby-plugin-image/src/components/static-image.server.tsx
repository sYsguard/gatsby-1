import React, { FunctionComponent } from "react"
import { StaticImageProps } from "../utils"
import { GatsbyImage as GatsbyImageServer } from "./gatsby-image.server"
import {
  GatsbyImageProps,
  ISharpGatsbyImageProps,
} from "./gatsby-image.browser"

// These values are added by Babel. Do not add them manually
interface IPrivateProps {
  __imageData?: ISharpGatsbyImageProps
  __error?: string
}

export function _getStaticImage(
  GatsbyImage: FunctionComponent<GatsbyImageProps>
): React.FC<StaticImageProps & IPrivateProps> {
  return function StaticImage({
    src,
    __imageData: imageData,
    __error,
    ...props
  }): JSX.Element {
    if (__error) {
      console.warn(__error)
    }

    if (imageData) {
      return <GatsbyImage image={imageData} {...props} />
    }
    console.warn(`Image not loaded`, src)
    if (!__error && process.env.NODE_ENV === `development`) {
      console.warn(
        `Please ensure that "gatsby-plugin-image" is included in the plugins array in gatsby-config.js`
      )
    }
    return null
  }
}

export const StaticImage: React.FC<
  StaticImageProps & IPrivateProps
> = _getStaticImage(GatsbyImageServer)
