import DB from '../../services/DB'
import { Request, Response } from 'ultimate-express';
import { randomUUID } from 'crypto';
import ApiAuthenticate from '../../services/ApiAuthenticate';
import { db } from '../../services/NativeDB'
class AuthApiController {

  public async register(request: Request, response: Response) {
    let { name, email, password } = request.body;

    email = email.toLowerCase();

    let user = db('users').where('email', email).first();

    if (user) {
      return response.status(400).json({ error: 'Email already in use' });
    }

    const newUser = {
      id: randomUUID(),
      name,
      email,
      password: await ApiAuthenticate.hash(password),
    };

    db('users').insert(newUser);

    return response.status(201).json({ message: 'User registered successfully' });
  }

  public async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = db('users').where('email', email.toLowerCase()).first();
    if (!user || !(await ApiAuthenticate.compare(password, user.password))) {
      return response.status(400).json({ error: 'Invalid email or password' });
    }

    user._agent = request.headers['user-agent'];
    const result = await ApiAuthenticate.process(user);
    return response.status(200).json(result);
  }

  public async logout(request: Request, response: Response) {
    const token = request.headers.authorization?.replace(/^Bearer\s+/i, '');
    const result = await ApiAuthenticate.logout(token);
    return response.status(200).json(result);
  }

  public async refreshToken(request: Request, response: Response) {
    // Implementation for refreshing JWT token
  }

  public async getProfile(request: Request, response: Response) {
    return response.status(200).json({ user: request.user });
  }

  public async updateProfile(request: Request, response: Response) {
    const { name, phone } = request.body;
    const userId = request.user.id;
    db('users').where('id', userId).update({ name, phone });
    return response.status(200).json({ message: 'Profile updated successfully' });
  }

}

export default new AuthApiController()