interface IconProps {
    width: string;
    height: string;
}

const DropzoneIcon: React.FC<IconProps> = ({width, height}) => (
<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 3C10.0204 3.00621 8.10822 3.7202 6.609 5.013C5.46 6.003 4.6275 7.293 4.413 8.5875C1.899 9.1425 0 11.3325 0 13.977C0 17.049 2.562 19.5 5.6715 19.5H19.0305C21.753 19.5 24 17.355 24 14.6595C24 12.2055 22.137 10.206 19.749 9.8685C19.3845 5.9985 16.035 3 12 3ZM15.531 10.719L12.531 7.719C12.4613 7.64916 12.3786 7.59374 12.2874 7.55593C12.1963 7.51812 12.0987 7.49866 12 7.49866C11.9013 7.49866 11.8037 7.51812 11.7125 7.55593C11.6214 7.59374 11.5387 7.64916 11.469 7.719L8.469 10.719C8.32817 10.8598 8.24905 11.0508 8.24905 11.25C8.24905 11.4492 8.32817 11.6402 8.469 11.781C8.60983 11.9218 8.80084 12.0009 9 12.0009C9.19916 12.0009 9.39017 11.9218 9.531 11.781L11.25 10.0605V15.75C11.25 15.9489 11.329 16.1397 11.4697 16.2803C11.6103 16.421 11.8011 16.5 12 16.5C12.1989 16.5 12.3897 16.421 12.5303 16.2803C12.671 16.1397 12.75 15.9489 12.75 15.75V10.0605L14.469 11.781C14.6098 11.9218 14.8008 12.0009 15 12.0009C15.1992 12.0009 15.3902 11.9218 15.531 11.781C15.6718 11.6402 15.7509 11.4492 15.7509 11.25C15.7509 11.0508 15.6718 10.8598 15.531 10.719Z" fill="#212529"/>
</svg>
);

export default DropzoneIcon;