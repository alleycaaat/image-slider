import { BsCamera } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';

export const Info = ({ info, height }) => {
    const { caption, url, artist, color, location, artistAddy } = info;
    const styles = {
        backgroundColor: color,
        height: height,
    };
    const svg = {
        ariaHidden: 'true',
        verticalAlign: 'middle',
    };

    return (
        <div className='info' style={styles}>
            <h1><a href={url}>{caption}</a></h1>
            <p>
                <BsCamera
                    style={svg}
                />
                {' '}
                <a
                    href={artistAddy}
                    target='_blank'
                    rel='noreferrer noopener'
                    aria-label='photo taken by'
                >{artist}
                </a>
            </p>
            {location !== '' &&
                <span>
                    <span className='sr-only'>Location:</span>
                    <IoLocationOutline
                    style={svg}
                    />
                    <p>{location}</p>
                </span>}
        </div>
    );
};