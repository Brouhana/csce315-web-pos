import ContentLoader from 'react-content-loader'

function Skeleton({ height, width }) {
  return (
    <ContentLoader
      speed={1}
      width={width}
      height={height}
      backgroundColor="var(--skeleton)"
      style={{ borderRadius: '10px' }}
    >
      <rect rx="3" ry="3" width={width} height={height} />
    </ContentLoader>
  )
}

export default Skeleton
