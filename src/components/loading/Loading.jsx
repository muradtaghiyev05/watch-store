import { Watch } from "react-loader-spinner";

const Loading = () => {
  return (
    <div style={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Watch
            height='100'
            width="100"
            radius="48"
            color="#22333b"
            ariaLabel="watch-loading"
            visible={true}
        />
    </div>
  )
}

export default Loading