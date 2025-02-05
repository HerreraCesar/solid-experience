import { bool, object, ref, string } from 'yup';

import { IsValidBirthday } from '../../utils/validationCustom';

const userValidationSchema = object( {
    firstName: string()
        .min( 2, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .required( 'av_required' ),
    lastName: string()
        .min( 2, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .required( 'av_required' ),
    email: string().email( 'Invalid email' ).required( 'av_required' ),
    gender: string()
        .oneOf( [ 'male', 'fame', 'other' ], 'av_required' )
        .required( 'av_required' ),
    country: string().required( 'av_required' ),
    birthday: string()
        .test( 'is-valid-format', 'Invalid format', ( value: any ) =>
            IsValidBirthday( value )
        )
        .required( 'av_required' ),
    phone: string().max( 20, 'av_too_long' ).required( 'av_required' ),
    documentType: string().required( 'av_required' ),
    documentNumber: string().required( 'av_required' ),
    address: string().required( 'av_required' ),
    enable: bool().required( 'av_required' ),
    password: string()
        .min( 2, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .required( 'av_required' ),
    passwordConfirmation: string()
        .oneOf( [ ref( 'password' ), null ], 'av_password_match' )
        .required( 'av_required' ),
} );

export default userValidationSchema;
