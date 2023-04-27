import { expressjwt } from 'express-jwt';

export default expressjwt({
    secret: '28ee283c-e4b5-11ed-b5ea-0242ac120002',
    algorithms: ['HS256'],
});
