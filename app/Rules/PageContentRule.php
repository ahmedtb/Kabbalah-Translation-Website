<?php

namespace App\Rules;

use App\PageComponents\PageContent;
use Illuminate\Contracts\Validation\Rule;
use Exception;

class PageContentRule implements Rule
{
    
    protected ?PageContent $structure;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(?PageContent $structure = null)
    {
        $this->structure = $structure;
    }

    protected $errorMessage;


    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        try {
            if ($value['class'] != PageContent::class)
                return false;
            $instance = PageContent::fromArray($value);
            if ($this->structure)
                $this->structure->isEqual($instance);
        } catch (Exception $e) {
            $this->errorMessage = $e->getMessage();
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
        return 'InValid PageContent Array: ' . $this->errorMessage;
    }
}
