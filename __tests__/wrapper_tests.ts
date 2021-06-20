import GistsWrapper from '../src/ts/gistsWrapper';
import { token } from './config.json';

describe("Tests for GitHub Gists wrapper", () => {
    const wrapper = new GistsWrapper(token)

    describe('Token validation', () => {
        test('GitHub API token validation', () => {
            return wrapper.validate().then(response => {
                expect(response.status).toEqual(200)
            })
        })

        test('GitHub API token validation with wrong token', () => {
            const wrongTokenWrapper = new GistsWrapper("wrongtoken")
            return wrongTokenWrapper.validate().catch(error => {
                expect(error.response.status).toEqual(401)
            })
        })
    })

    describe('Getting gists', () => {
        test('Getting gists', () => {
            return wrapper.getGists(null, 10, 1).then(response => {
                expect(response.status).toEqual(200)
            })
        })

        test('Getting gists with incorrect GitHub API token', () => {
            const wrongTokenWrapper = new GistsWrapper("wrongtoken")
            return wrongTokenWrapper.getGists().catch(error => {
                expect(error.response.status).toEqual(401)
            })
        })
    })

    describe("Getting gist by ID", () => {
        test("Gist with proper ID", () => {
            return wrapper.getGist("92bc35bc573f4ce93a33c6d20807e814").then(response => {
                expect(response.status).toEqual(200)
            })
        })

        test("Getting gist with incorrect ID", () => {
            return wrapper.getGist("abc").catch(error => {
                expect(error.response.status).toEqual(404)
            })
        })
    })

    describe("Creating, updating and removing gist", () => {
        const files = {
            "hello_world.rb": {
                "content": "class HelloWorld\n   def initialize(name)\n      @name = name.capitalize\n   end\n   def sayHi\n      puts \"Hello !\"\n   end\nend\n\nhello = HelloWorld.new(\"World\")\nhello.sayHi"
            },
            "hello_world.py": {
                "content": "class HelloWorld:\n\n    def __init__(self, name):\n        self.name = name.capitalize()\n       \n    def sayHi(self):\n        print \"Hello \" + self.name + \"!\"\n\nhello = HelloWorld(\"world\")\nhello.sayHi()"
            },
            "hello_world_ruby.txt": {
                "content": "Run `ruby hello_world.rb` to print Hello World"
            },
            "hello_world_python.txt": {
                "content": "Run `python hello_world.py` to print Hello World"
            }
        }

        let gistID: string | null = null;

        test("Creating a new gits", () => {
            return wrapper.createGist("test", false, files).then(response => {
                expect(response.status).toEqual(201)
                gistID = response.data.id
            })
        })

        test("Updating the gist", () => {
            return wrapper.updateGist(gistID, "update_test", files).then(response => {
                expect(response.status).toEqual(200)
            })
        })

        test("Updating a gist with incorrect ID", () => {
            return wrapper.updateGist("abc", "update_test", files).catch(error => {
                expect(error.response.status).toEqual(404)
            })
        })

        test("Deleting the gist", () => {
            return wrapper.deleteGist(gistID).then(response => {
                expect(response.status).toEqual(204)
            })
        })

        test("Deleting a gist with incorrect ID", () => {
            return wrapper.deleteGist("abc").catch(error => {
                expect(error.response.status).toEqual(404)      
            })
        })
    })
})