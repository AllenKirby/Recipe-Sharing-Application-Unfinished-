import Lottie from "react-lottie"
import Successful from '../assets/successful.json'
import PropTypes from 'prop-types'

const Save = ({message}) => {

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: Successful,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <section className="fixed z-10 left-0 top-0 w-full h-full flex items-center justify-center">
        <div className=" p-7 rounded-lg w-72 h-auto bg-fonts text-white text-center">
            <Lottie options={defaultOptions} height={100} width={100}/>
            <p className="text-xl font-semibold mt-4">{message}</p>
        </div>
    </section>
  )
}

Save.propTypes = {
  message: PropTypes.string.isRequired
}

export default Save