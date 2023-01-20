import { bool, object, string } from 'yup';

const categorySchema = object( {
    title: string()
        .min( 3, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .required( 'av_required' ),
    enable: bool().required(),
} );

export default categorySchema;
