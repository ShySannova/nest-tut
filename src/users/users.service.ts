import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'San',
      email: 'sandeep09prasad@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Brown',
      email: 'brown@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Joe',
      email: 'joe@gmail.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Dave',
      email: 'dave@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Kevin',
      email: 'kevin@gmail.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => {
        return user.role === role;
      });
    }
    return this.users;
  }

  findAllInterns() {
    return this.users.filter((user) => {
      return user.role === 'INTERN';
    });
  }

  findOne(id: number) {
    const user = this.users.find((user) => {
      if (id === user.id) {
        return user;
      }
    });
    return user;
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const generateId = this.users[this.users.length - 1].id + 1;
    const newUser = {
      id: generateId,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      }
      return user;
    });

    return { id, ...userUpdate };
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => {
      return user.id !== id;
    });
    return removedUser;
  }
}
