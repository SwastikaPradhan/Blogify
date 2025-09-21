
import { Auth } from '../components/Auth'
import { Quote } from '../components/Quote'

const Signup = () => {
  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <Auth type="signup"/>
            </div>
            <div className="hidden lg:block">
              <div className="absolute left-0 top-0 h-full w-px bg-gray-300"></div>
                <div className="pl-8">
                   <Quote/>
                </div>
            </div>
        </div>        
    </div>
  )
}

export default Signup