console.log("kyj 3회차 실습 시작");

enum Role {
  LIBRARIAN, // 사서
  MEMBER, // 멤버
}

// 추상 클래스
abstract class User {
  constructor(public name: string, public age: number) {}
  abstract getRole(): Role;
}

// 멤버
class Member extends User {
  constructor(name: string, age: number) {
    super(name, age);
  }

  getRole(): Role {
    return Role.MEMBER;
  }
}

// 사서
class Librarian extends User {
  constructor(name: string, age: number) {
    super(name, age);
  }

  getRole(): Role {
    return Role.LIBRARIAN;
  }
}

class Book {
  constructor(
    public title: string,
    public author: string,
    public publishedDate: Date
  ) {}
}

interface RentManager {
  getBooks(): Book[]; // 도서관의 현재 책 목록
  addBook(user: User, book: Book): void; // 사서가 책 추가할 때
  removeBook(user: User, book: Book): void; // 사서가 책 삭제할 때
  rentBook(user: Member, book: Book): void; // 유저가 책을 빌릴 때
  returnBook(user: Member, book: Book): void; // 유저가 책을 반납할 때
}

class Library implements RentManager {
  private books: Book[] = [];
  private rentedBooks: Map<string, Book> = new Map<string, Book>();

  getBooks(): Book[] {
    return JSON.parse(JSON.stringify(this.books));
  }

  addBook(user: User, book: Book): void {
    if (user.getRole() !== Role.LIBRARIAN) {
      // 사서가 아님
      return;
    }
    this.books.push(book);
  }

  removeBook(user: User, book: Book): void {
    if (user.getRole() !== Role.LIBRARIAN) {
      // 사서가 아님
      return;
    }
    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  rentBook(user: Member, book: Book): void {
    if (user.getRole() !== Role.MEMBER) {
      // 멤버가 아님
      return;
    }
    if (this.rentedBooks.has(user.name)) {
      console.log(
        `${user.name}님은 이미 다른 책을 대여중이라 빌릴 수 없습니다.`
      );
    } else {
      this.rentedBooks.set(user.name, book);
      console.log(`${user.name}님이 [${book.title}] 책을 빌렸습니다.`);
    }
  }

  returnBook(user: User, book: Book): void {
    if (user.getRole() !== Role.MEMBER) {
      console.log("유저만 도서를 반납할 수 있습니다.");
      return;
    }

    if (this.rentedBooks.get(user.name) === book) {
      this.rentedBooks.delete(user.name);
      console.log(`${user.name}님이 [${book.title}] 책을 반납했어요!`);
    } else {
      console.log(`${user.name}님은 [${book.title}] 책을 빌린적이 없어요!`);
    }
  }
}

function main() {
  const myLibrary = new Library();
  const librarian = new Librarian("르탄이", 30);
  const member1 = new Member("예비개발자", 30);
  const member2 = new Member("독서광", 28);

  const book = new Book("TypeScript 문법 종합반", "강창민", new Date());
  const book2 = new Book("금쪽이 훈육하기", "오은영", new Date());
  const book3 = new Book("요식업은 이렇게!", "백종원", new Date());

  myLibrary.addBook(librarian, book);
  myLibrary.addBook(librarian, book2);
  myLibrary.addBook(librarian, book3);
  const books = myLibrary.getBooks();
  console.log("대여할 수 있는 도서 목록:", books);

  myLibrary.rentBook(member1, book);
  myLibrary.rentBook(member2, book2);

  myLibrary.returnBook(member1, book);
  myLibrary.returnBook(member2, book2);
}

main();
