export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'akfr-vfybfr',
    algorithms: ['HS256']
  };