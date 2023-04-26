import { expressjwt } from 'express-jwt';

export default expressjwt({
    secret: 'ACCESS_TOKEN_SECRET',
    algorithms: ['HS256'],
});
