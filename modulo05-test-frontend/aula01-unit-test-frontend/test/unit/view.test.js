import { describe, expect, it, jest } from '@jest/globals'
import View from '../../public/src/view.js'
describe('View test suite', () => {
    it('#updateList should append content to card-list innerHTML', function () {
        const innerHTMLSpy = jest.fn()
        const baseHTML = '<div></div>'
        const querySelectorProxy = new Proxy({
            innerHTML: baseHTML
        }, {
            set(obj, key, value) {
                obj[key] = value
                innerHTMLSpy(obj[key])
                return true
            }
        })
        jest
            .spyOn(document, document.querySelector.name)
            .mockImplementation((key) => {
                if (key !== '#card-list') return;
                return querySelectorProxy
            })
        const view = new View()
        const data = {
            title: 'test',
            imageUrl: 'https://via.placeholder.com/150',
        }

        const generateContent = () => `
        <article class="col-md-12 col-lg-4 col-sm-3 top-30">
                <div class="card">
                    <figure>
                        <img class="card-img-top card-img"
                            src="${data.imageUrl}"
                            alt="Image of an ${data.title}">
                        <figcaption>
                            <h4 class="card-title">${data.title}</h4>
                        </figcaption>
                    </figure>
                </div>
            </article>
        `

        view.updateList([data])
        expect(innerHTMLSpy).toHaveBeenNthCalledWith(1, baseHTML + generateContent())
        view.updateList([data])
        expect(innerHTMLSpy)
            .toHaveBeenNthCalledWith(2, baseHTML + generateContent() + generateContent())
    })
    it('#configureOnSubmit should set submitFn', function () {
        const view = new View()
        const submitFn = jest.fn()
        const onSubmitProxy = new Proxy({}, {
            set(obj, key, value) {
                obj[key] = value
                return true
            }
        })
        jest
            .spyOn(view, view.configureOnSubmit.name)
            .mockImplementation((form) => {
                onSubmitProxy.submitFn = form
            })
        view.configureOnSubmit(submitFn)
        onSubmitProxy.submitFn()
        expect(submitFn).toHaveBeenCalled()
    })


})