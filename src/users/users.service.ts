import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

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
      const rolesArray = this.users.filter((user) => {
        return user.role === role;
      });
      if (rolesArray.length === 0) {
        throw new NotFoundException('User Role Not Found');
      }
      return rolesArray;
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
      return id === user.id;
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const generateId = this.users[this.users.length - 1].id + 1;
    const newUser = {
      id: generateId,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => {
      return user.id !== id;
    });
    return removedUser;
  }
}
