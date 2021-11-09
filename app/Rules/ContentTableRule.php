<?php

namespace App\Rules;

use Exception;
use App\Models\Page;
use Illuminate\Contracts\Validation\Rule;

class ContentTableRule implements Rule
{

    private string $message;
    private string $subMessage;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function validateChapter($element)
    {

        if (gettype($element['title']) != 'string') {
            $this->subMessage = 'chapter title is not string';
            return false;
        }
        if (gettype($element['sections']) != 'array') {
            $this->subMessage = 'chapter sections is not array';
            return false;
        }
        foreach ($element['sections'] as $section) {
            if (!$this->validateSection($section))
                return false;
        }
        return true;
    }

    public function validateSection($element)
    {

        if (gettype($element['title']) != 'string') {
            $this->subMessage = 'section title is not string';
            return false;
        }
        $page = Page::where('id', $element['page_id'])->first();
        if (!$page) {
            $this->subMessage = 'section page_id: ' . $element['page_id'] . ' is not valid';
            return false;
        }
        return true;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $contentTable)
    {
        try {

            foreach ($contentTable as $index => $element) {
                if ($element['type'] == 'section') {
                    if (!$this->validateSection($element)) {
                        $this->message = 'section ' . $index . ' is not valid';
                        return false;
                    }
                } else if ($element['type'] == 'chapter') {
                    if (!$this->validateChapter($element)) {
                        $this->message = 'chapter ' . $index . ' is not valid';
                        return false;
                    }
                } else {
                    $this->message = 'at index: ' . $index . ': type must only be section or chapter';
                    return false;
                }
            }
        } catch (Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The ContentTable is not valid table: ' . $this->message . ', ' . ($this->subMessage ?? '');
    }
}
