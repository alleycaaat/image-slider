export const Slide = ({ height, image }) => {
    const styles = {
        backgroundImage: `url(${ image })`,
        height: height,
}
    return <div className='slide' style={styles}></div>
};