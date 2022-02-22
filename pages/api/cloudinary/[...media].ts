import { isAuthorized } from '@tinacms/auth'
import { NextApiRequest } from 'next'
import {
  mediaHandlerConfig,
  createMediaHandler
} from 'next-tinacms-cloudinary/dist/handlers'

export const config = mediaHandlerConfig
const env = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
}
console.info(env)
export default createMediaHandler({
  ...env,
  // @ts-ignore
  authorized: async (req: NextApiRequest) => {
    if (process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT === '1') {
      return true
    }
    try {
      const user = await isAuthorized(req)
      return user && user.verified
    } catch (e) {
      console.error(e)
      return false
    }
  }
})
